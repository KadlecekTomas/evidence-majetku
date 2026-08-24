export type AssetId = string;

export type AssetChange = {
  assetId: AssetId;
  operation: "create" | "update" | "move" | "retire";
  changedFields: Record<string, unknown>;
  idempotencyKey: string;
  occurredAt: string;
};

export type ReconciliationDifference = {
  externalId: string;
  assetId?: AssetId;
  field: string;
  localValue: unknown;
  externalValue: unknown;
};
