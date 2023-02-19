export interface MenuItem {
    id: number,
    name: string,
    path: string
}

export const MENU_ITEMS: Array<MenuItem> = [
    {
        id: 1,
        name: "Goblin Quest",
        path: "/goblin-quest"
    }
];