import { EntityManager, IDatabaseDriver, Connection } from "@mikro-orm/core";

export type MyContext = {
    em: undefined | EntityManager<IDatabaseDriver<Connection>>;
};
