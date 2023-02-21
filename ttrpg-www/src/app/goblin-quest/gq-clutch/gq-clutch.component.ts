import { Component, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

import { GoblinQuestService } from 'src/app/services/goblin-quest.service';
import { Clutch, Goblin } from 'src/app/shared/models/goblinQuest';

import { Subscription } from "rxjs";

const DEFAULT_CLUTCH: Clutch = {
  id: 0,
  honorific: "",
  expertise: "",
  quirk: "",
  dream: "",
  heirloom: "",
  goblins: [
    { id: 1, name: "", feature: "", hp: 2, death: "" },
    { id: 2, name: "", feature: "", hp: 2, death: "" },
    { id: 3, name: "", feature: "", hp: 2, death: "" },
    { id: 4, name: "", feature: "", hp: 2, death: "" },
    { id: 5, name: "", feature: "", hp: 2, death: "" },
  ]
}


@Component({
  selector: 'app-gq-clutch',
  templateUrl: './gq-clutch.component.html',
  styleUrls: ['./gq-clutch.component.scss']
})
export class GqClutchComponent implements OnInit, OnDestroy {
  
  savedClutchSubscription!: Subscription;
  newClutchSubscription!: Subscription;

  savedClutches!: Array<Clutch>;
  clutchSelection: string = "";
  isNewClutch: boolean = true;

  selectedClutch!: Clutch;
  selectedGoblin!: Goblin;
  goblinHealth!: Array<{ id: number, injured: boolean }>;

  clutchForm = new FormGroup({
    honorific: new FormControl("", [Validators.required, this.noWhitespaceValidator]),
    expertise: new FormControl("", [Validators.required, this.noWhitespaceValidator]),
    quirk: new FormControl("", [Validators.required, this.noWhitespaceValidator]),
    dream: new FormControl("", [Validators.required, this.noWhitespaceValidator]),
    heirloom: new FormControl("", [Validators.required, this.noWhitespaceValidator])
  });

  goblinForm = new FormGroup({
    name: new FormControl("", Validators.required),
    feature: new FormControl("", Validators.required),
    death: new FormControl({ value: "", disabled: true })
  });

  constructor(private goblinQuestService: GoblinQuestService) {
    this.selectedClutch = DEFAULT_CLUTCH;
  }

  ngOnInit(): void {
    this.getClutches();
  }

  getClutches() {
    this.savedClutchSubscription = this.goblinQuestService.getAllClutch().subscribe(
      (data) => {
        this.savedClutches = data;
      }
    );
  }

  onChangeSelectClutch(value: string): void {
    if (this.selectedClutch.id !== 0)
      this.updateClutch();
    let id = +value.split("clutch-")[1];

    if (id === 0)
      // Prefilled example Clutch
      this.selectedClutch = DEFAULT_CLUTCH;
    this.updateClutchForm(id);
  }

  updateClutchForm(id: number): void {
    if (this.selectedClutch?.id != id) {
      this.selectedClutch = this.savedClutches.find((clutch) => {
        return clutch.id === id
      })!
    }

    this.clutchForm.patchValue({
      honorific: this.selectedClutch.honorific,
      expertise: this.selectedClutch.expertise,
      quirk: this.selectedClutch.quirk,
      dream: this.selectedClutch.dream,
      heirloom: this.selectedClutch.heirloom,
    });
    
    this.isNewClutch = id === 0 ? true : false;
    
    if (this.selectedClutch.id !== 0) {
      this.getGoblin(1, false);
    }
  }
  
  isClutchFormInvalid(status: any): boolean {
    return status === "INVALID" ? true : false;
  }

  noWhitespaceValidator(control: FormControl) {
    const isWhitespace = (control.value || '').trim().length === 0;
    const isValid = !isWhitespace;
    return isValid ? null : { 'whitespace': true };
  }

  setNewClutch(): void {
    this.goblinHealth = [
      { id: 1, injured: false },
      { id: 2, injured: false }
    ];
    
    this.newClutchSubscription = this.goblinQuestService.addClutch({
      ...this.selectedClutch,
      ...this.clutchForm.value
    })
      .subscribe( (data) => {
        this.selectedClutch = data;
        this.clutchSelection = "clutch-" + data.id;
        this.updateClutchForm(data.id);
        this.isNewClutch = false;
        this.getClutches();
      }
    );
  }

  updateClutch(): void {
    if (this.clutchForm.status === "VALID" && this.goblinForm.status === "VALID") {
      let updatedClutch = { ...this.selectedClutch, ...this.clutchForm.value };
      let updatedGoblin = { ...this.selectedGoblin, ...this.goblinForm.value };
      updatedClutch.goblins[updatedGoblin.id - 1] = updatedGoblin as Goblin;
      this.newClutchSubscription = this.goblinQuestService.updateClutch(updatedClutch)
        .subscribe( (data) => {
          this.getClutches();
        });
    }
  }

  deleteClutch(): void {
    this.newClutchSubscription = this.goblinQuestService.deleteClutch("clutch", this.selectedClutch.id)
      .subscribe((status: boolean) => {
      this.getClutches();
      this.selectedClutch = DEFAULT_CLUTCH;
      this.clutchSelection = "clutch-0";
      this.onChangeSelectClutch("clutch-0");
    });
  }

  getGoblin(i: number, update: boolean = true): void {
    if (update)
      this.updateClutch();
    this.selectedGoblin = this.selectedClutch.goblins[i - 1];
    this.checkGoblinAlive(this.selectedGoblin.hp);
    this.goblinForm.patchValue({
      name: this.selectedGoblin.name,
      feature: this.selectedGoblin.feature,
      death: this.selectedGoblin.death
    });

    switch (this.selectedGoblin.hp) {
      case 2:
        this.goblinHealth = [
          { id: 1, injured: false },
          { id: 2, injured: false }
        ];
        break;
      case 1:
        this.goblinHealth = [
          { id: 1, injured: true },
          { id: 2, injured: false }
        ];
        break;
      case 0:
        this.goblinHealth = [
          { id: 1, injured: true },
          { id: 2, injured: true }
        ];
        break;
    }    
  }

  getGoblinColor(i: number): string {
    if (this.selectedClutch.goblins[i - 1].hp === 0)
      return "warn";
    if (this.selectedGoblin)
      return this.selectedGoblin.id === i ? "primary" : "accent";
    return "accent";
  }

  getGoblinHealth(id: number): string {
    if (this.goblinHealth[id - 1].injured)
      return "warn";
    return "accent";
  }

  setGoblinHealth(id: number): void {
    if (this.goblinHealth[id - 1].injured) {
      this.selectedGoblin.hp++;
      this.goblinHealth[id - 1].injured = false;
    } else {
      this.selectedGoblin.hp--;
      this.goblinHealth[id - 1].injured = true;
    }
    this.checkGoblinAlive(this.selectedGoblin.hp);
    this.getGoblinHealth(id);
  }

  checkGoblinAlive(hp: number): void {
    if (hp === 0)
      this.goblinForm.get("death")?.enable();
    else
      this.goblinForm.get("death")?.disable();
  }

  ngOnDestroy(): void {
    this.updateClutch();
    this.savedClutchSubscription.unsubscribe();
    this.newClutchSubscription.unsubscribe();
  }

}
