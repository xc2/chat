/**
 * Generated
 **/
import type { MigrationMeta } from "drizzle-orm/migrator";

// biome-ignore format: generated
export const migrations: MigrationMeta[] = [
  {
    sql: [
      'CREATE TABLE "example" (\n' +
        '\t"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "example_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),\n' +
        '\t"foo" varchar(255) NOT NULL,\n' +
        '\t"bar" integer NOT NULL\n' +
        ');\n'
    ],
    bps: true,
    folderMillis: 1741884588209,
    hash: '19b383eb624a6ede5e0b4cd0b663a77946eecd58e7f1875d3a0c60eb9dd5b251'
  }
];
