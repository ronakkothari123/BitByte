import {
    Collection,
    Entity,
    OneToMany,
    PrimaryKey,
    Property,
} from "@mikro-orm/core";
import { Draft } from "./Draft";

@Entity()
export class User {
    @PrimaryKey()
    id!: number;

    @Property({ type: "date" })
    createdAt = new Date();

    @Property({ type: "date", onUpdate: () => new Date() })
    updatedAt = new Date();

    @Property({ type: "text" })
    username!: string;

    @Property({ type: "text" })
    password!: string;

    @Property({ type: "text", nullable: true })
    name: string;

    @OneToMany(() => Draft, (draft) => draft.user, { nullable: true })
    drafts = new Collection<Draft>(this);

    @Property({ type: "text", nullable: true })
    trophies: string;
}
