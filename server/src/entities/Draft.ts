import { Entity, ManyToOne, PrimaryKey, Property } from "@mikro-orm/core";
import { User } from "./User";

@Entity()
export class Draft {
    @PrimaryKey()
    id!: number;

    @Property({ type: "date" })
    createdAt = new Date();

    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property({ type: "text" })
    name!: string;

    @Property({ type: "text" })
    team!: string;

    @ManyToOne({ type: "User" })
    user!: User;
}
