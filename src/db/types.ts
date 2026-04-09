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
  todo: todoTable;
};

export type personTable = {
  id: Generated<number>;
  username: string;
  email: string;
  password_hash: string;
  created_at: ColumnType<Date, string | undefined, never>;
};

export type todoTable = {
  id: Generated<number>;
  title: string;
  note: string;
  created_at: ColumnType<Date, string | undefined, string | undefined>;
  is_completed: ColumnType<boolean, boolean | undefined, boolean | undefined>;
  person_id: number;
};

export type Person = Selectable<personTable>;
export type NewPerson = Insertable<personTable>;
export type PersonUpdate = Updateable<personTable>;

export type Todo = Selectable<todoTable>;
export type NewTodo = Insertable<todoTable>;
export type TodoUpdate = Updateable<todoTable>;
