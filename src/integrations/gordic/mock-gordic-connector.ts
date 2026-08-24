import type { AssetChange } from "@/domain/assets/types";
import type {
  AssetSystemConnector,
  ConnectionResult,
  ExternalAsset,
  ExternalAssetBatch,
  ExternalLocation,
  ReconciliationResult,
  SyncResult,
} from "@/integrations/contracts/asset-system-connector";

export class MockGordicConnector implements AssetSystemConnector {
  readonly provider = "GORDIC" as const;
  readonly mode = "MOCK" as const;
  readonly capabilities = {
    onlineRead: true,
    onlineWrite: true,
    batchImport: true,
    batchExport: true,
    locations: true,
    responsiblePersons: true,
  } as const;

  private readonly processedChanges = new Map<string, SyncResult>();

  constructor(
    private readonly assets: ExternalAsset[] = [],
    private readonly locations: ExternalLocation[] = [],
  ) {}

  async testConnection(): Promise<ConnectionResult> {
    return { ok: true, checkedAt: new Date().toISOString(), message: "Mock GORDIC connector ready" };
  }

  async pullAssets(cursor?: string): Promise<ExternalAssetBatch> {
    const offset = cursor ? Number.parseInt(cursor, 10) : 0;
    const pageSize = 100;
    const batch = this.assets.slice(offset, offset + pageSize);
    const nextOffset = offset + batch.length;

    return {
      assets: batch,
      nextCursor: nextOffset < this.assets.length ? String(nextOffset) : undefined,
    };
  }

  async pullLocations(): Promise<ExternalLocation[]> {
    return [...this.locations];
  }

  async pushAssetChange(change: AssetChange): Promise<SyncResult> {
    const previous = this.processedChanges.get(change.idempotencyKey);
    if (previous) return previous;

    const result: SyncResult = {
      status: "synced",
      externalId: `mock-${change.assetId}`,
      externalVersion: change.occurredAt,
    };

    this.processedChanges.set(change.idempotencyKey, result);
    return result;
  }

  async reconcile(): Promise<ReconciliationResult> {
    return { checked: this.assets.length, differences: [] };
  }
}
