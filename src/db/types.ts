// import
import type {
  ColumnType,
  Generated,
  Insertable,
  Selectable,
  Updateable,
} from "kysely";

export type Database = {
  person: personTable;
  // todo: todoTable;
};

export type personTable = {
  id: Generated<number>;
  username: string;
  email: string;
  password_hash: string;
  created_at: ColumnType<Date, string | undefined, never>;
};

// export type todoTable = {
//   id: Generated<number>;
//   name: string;
//   note: string;
// };
export type Person = Selectable<personTable>;
export type NewPerson = Insertable<personTable>;
export type PersonUpdate = Updateable<personTable>;
