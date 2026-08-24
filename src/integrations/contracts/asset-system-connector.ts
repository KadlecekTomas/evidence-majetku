import type { AssetChange, ReconciliationDifference } from "@/domain/assets/types";

export type ConnectorCapabilities = {
  onlineRead: boolean;
  onlineWrite: boolean;
  batchImport: boolean;
  batchExport: boolean;
  locations: boolean;
  responsiblePersons: boolean;
};

export type ConnectionResult =
  | { ok: true; checkedAt: string; message?: string }
  | { ok: false; checkedAt: string; error: string };

export type ExternalAsset = {
  externalId: string;
  inventoryNumber?: string;
  name: string;
  serialNumber?: string;
  acquisitionDate?: string;
  acquisitionPrice?: string;
  locationExternalId?: string;
  responsiblePersonExternalId?: string;
  version?: string;
  raw: unknown;
};

export type ExternalLocation = {
  externalId: string;
  code?: string;
  name: string;
  raw: unknown;
};

export type ExternalAssetBatch = {
  assets: ExternalAsset[];
  nextCursor?: string;
};

export type SyncResult =
  | { status: "synced"; externalId?: string; externalVersion?: string }
  | { status: "conflict"; reason: string }
  | { status: "failed"; retryable: boolean; error: string };

export type ReconciliationResult = {
  checked: number;
  differences: ReconciliationDifference[];
};

export interface AssetSystemConnector {
  readonly provider: "GORDIC";
  readonly mode: "XRG" | "INT" | "FILE" | "MOCK";
  readonly capabilities: ConnectorCapabilities;

  testConnection(): Promise<ConnectionResult>;
  pullAssets(cursor?: string): Promise<ExternalAssetBatch>;
  pullLocations(): Promise<ExternalLocation[]>;
  pushAssetChange(change: AssetChange): Promise<SyncResult>;
  reconcile(): Promise<ReconciliationResult>;
}
