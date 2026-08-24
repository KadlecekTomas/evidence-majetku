import { describe, expect, it } from "vitest";
import { MockGordicConnector } from "../../src/integrations/gordic/mock-gordic-connector";

const assets = Array.from({ length: 101 }, (_, index) => ({
  externalId: `g-${index + 1}`,
  inventoryNumber: `EV-${String(index + 1).padStart(4, "0")}`,
  name: `Test asset ${index + 1}`,
  raw: { source: "fixture" },
}));

describe("MockGordicConnector", () => {
  it("paginates inbound assets without losing records", async () => {
    const connector = new MockGordicConnector(assets);
    const first = await connector.pullAssets();
    const second = await connector.pullAssets(first.nextCursor);

    expect(first.assets).toHaveLength(100);
    expect(second.assets).toHaveLength(1);
    expect(second.nextCursor).toBeUndefined();
  });

  it("treats repeated outbound changes as idempotent", async () => {
    const connector = new MockGordicConnector();
    const change = {
      assetId: "asset-1",
      operation: "move" as const,
      changedFields: { roomId: "room-204" },
      idempotencyKey: "move-asset-1-room-204",
      occurredAt: "2026-08-24T19:00:00.000Z",
    };

    const first = await connector.pushAssetChange(change);
    const repeated = await connector.pushAssetChange(change);

    expect(repeated).toEqual(first);
    expect(first.status).toBe("synced");
  });
});
