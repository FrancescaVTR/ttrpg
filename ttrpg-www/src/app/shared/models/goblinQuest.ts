export interface Clutch {
    id: number,
    honorific: string,
    expertise: string,
    quirk: string,
    dream: string,
    heirloom: string,
    goblins: Array<Goblin>
}

export interface Goblin {
    id: number,
    name: string,
    feature: string,
    hp: number,
    death: string
}