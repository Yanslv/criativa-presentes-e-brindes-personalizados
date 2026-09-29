import { describe, expect, it } from "vitest";
import empresa from "../empresa.json";
import {
  appleMapsUrl,
  buildNavigationLinks,
  detectPlatform,
  geoUrl,
  googleMapsUrl,
  resolveLocationAction,
  uberUrl,
  wazeUrl,
} from "@/lib/navigation-links";

const coords = { lat: -15.601411, lng: -56.097892 };
const withCoords = { latitude: coords.lat, longitude: coords.lng, mapsUrl: null, label: "Loja Teste" };

describe("resolveLocationAction", () => {
  it("retorna null para os dados atuais (sem coordenadas nem mapsUrl)", () => {
    const action = resolveLocationAction({
      latitude: empresa.contact.latitude,
      longitude: empresa.contact.longitude,
      mapsUrl: empresa.contact.mapsUrl,
    });
    expect(action).toBeNull();
  });

  it("abre o mapsUrl diretamente quando só ele existe", () => {
    const action = resolveLocationAction({ latitude: null, longitude: null, mapsUrl: "https://maps.app.goo.gl/abc" });
    expect(action).toEqual({ kind: "direct", href: "https://maps.app.goo.gl/abc" });
  });

  it("monta a bandeja quando há coordenadas", () => {
    const action = resolveLocationAction(withCoords, "other");
    expect(action?.kind).toBe("tray");
    if (action?.kind !== "tray") return;
    expect(action.links.map((l) => l.id)).toEqual(["google", "waze", "uber", "99"]);
    expect(action.copyText).toBe("-15.601411, -56.097892");
  });
});

describe("buildNavigationLinks", () => {
  it("inclui Apple Maps só no iOS", () => {
    expect(buildNavigationLinks(withCoords, "ios").map((l) => l.id)).toContain("apple");
    expect(buildNavigationLinks(withCoords, "android").map((l) => l.id)).not.toContain("apple");
  });

  it("inclui apps do sistema (geo:) só no Android", () => {
    expect(buildNavigationLinks(withCoords, "android").map((l) => l.id)).toContain("geo");
    expect(buildNavigationLinks(withCoords, "ios").map((l) => l.id)).not.toContain("geo");
  });

  it("retorna lista vazia sem coordenadas", () => {
    expect(buildNavigationLinks({ latitude: null, longitude: 1, mapsUrl: null }, "ios")).toEqual([]);
  });
});

describe("URLs de navegação", () => {
  it("Google Maps", () => {
    expect(googleMapsUrl(coords)).toBe("https://www.google.com/maps/dir/?api=1&destination=-15.601411,-56.097892");
  });
  it("Waze", () => {
    expect(wazeUrl(coords)).toBe("https://waze.com/ul?ll=-15.601411,-56.097892&navigate=yes");
  });
  it("Uber", () => {
    const url = uberUrl(coords, "Loja Teste");
    expect(url).toContain("dropoff[latitude]=-15.601411");
    expect(url).toContain("dropoff[nickname]=Loja%20Teste");
  });
  it("Apple Maps", () => {
    expect(appleMapsUrl(coords)).toBe("https://maps.apple.com/?daddr=-15.601411,-56.097892&q=Destino");
  });
  it("geo:", () => {
    expect(geoUrl(coords, "A B")).toBe("geo:-15.601411,-56.097892?q=-15.601411,-56.097892(A%20B)");
  });
});

describe("detectPlatform", () => {
  it("identifica iOS, Android e outros", () => {
    expect(detectPlatform("Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)")).toBe("ios");
    expect(detectPlatform("Mozilla/5.0 (Linux; Android 14; Pixel 8)")).toBe("android");
    expect(detectPlatform("Mozilla/5.0 (Windows NT 10.0; Win64; x64)")).toBe("other");
  });
});
