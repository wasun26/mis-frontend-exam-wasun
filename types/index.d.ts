export { Mode, Notifier, ListPage, Index, Name, Reference, OldFile };

declare global {
  type Mode = "add" | "edit";

  type Notifier =
    | "success"
    | "info"
    | "warning"
    | "error"
    | "delete"
    | "custom";

  interface ListPage<T> {
    pageCount: number;
    results: T[];
    rowCount: number;
  }

  interface Index {
    index?: number;
  }
  interface Name {
    name: string;
    nameEn?: string;
  }

  interface Reference extends Name {
    id?: number | null;
    description?: string;
    orderSort?: number;
    color?: string;
    icon?: string;
    isActive?: boolean;
    code?: string;
  }
  interface OldFile {
    fileUrl: string;
    fileName: string;
  }
  interface ReferenceSelect extends Name {
    id?: number | null;
  }
}
