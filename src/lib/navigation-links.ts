// Funções puras para links de navegação até o local.
// Neste projeto não há coordenadas nem mapsUrl confirmados, então
// resolveLocationAction retorna null e nenhum botão "Ir para o local" é exibido.

export type LocationInput = {
  latitude: number | null;
  longitude: number | null;
  mapsUrl: string | null;
  label?: string;
  address?: string | null;
};

export type Platform = "ios" | "android" | "other";

export type NavigationLink = {
  id: "google" | "waze" | "uber" | "99" | "apple" | "geo";
  label: string;
  href: string;
};

export type LocationAction =
  | { kind: "tray"; links: NavigationLink[]; copyText: string; shareText: string }
  | { kind: "direct"; href: string }
  | null;

type Coords = { lat: number; lng: number };

const fmt = (n: number) => n.toFixed(6);

export const googleMapsUrl = ({ lat, lng }: Coords) =>
  `https://www.google.com/maps/dir/?api=1&destination=${fmt(lat)},${fmt(lng)}`;

export const wazeUrl = ({ lat, lng }: Coords) => `https://waze.com/ul?ll=${fmt(lat)},${fmt(lng)}&navigate=yes`;

export const uberUrl = ({ lat, lng }: Coords, label = "Destino") =>
  `https://m.uber.com/ul/?action=setPickup&pickup=my_location&dropoff[latitude]=${fmt(lat)}&dropoff[longitude]=${fmt(lng)}&dropoff[nickname]=${encodeURIComponent(label)}`;

/** A 99 não oferece deep link público estável com destino; o fallback abre o app/site da 99. */
export const ninetyNineUrl = () => "https://99app.com/";

export const appleMapsUrl = ({ lat, lng }: Coords, label = "Destino") =>
  `https://maps.apple.com/?daddr=${fmt(lat)},${fmt(lng)}&q=${encodeURIComponent(label)}`;

export const geoUrl = ({ lat, lng }: Coords, label = "Destino") =>
  `geo:${fmt(lat)},${fmt(lng)}?q=${fmt(lat)},${fmt(lng)}(${encodeURIComponent(label)})`;

export function detectPlatform(userAgent: string): Platform {
  if (/iPad|iPhone|iPod/i.test(userAgent) || (/Macintosh/i.test(userAgent) && /Mobile/i.test(userAgent))) return "ios";
  if (/Android/i.test(userAgent)) return "android";
  return "other";
}

function hasCoords(input: LocationInput): input is LocationInput & { latitude: number; longitude: number } {
  return (
    typeof input.latitude === "number" &&
    typeof input.longitude === "number" &&
    Number.isFinite(input.latitude) &&
    Number.isFinite(input.longitude)
  );
}

export function buildNavigationLinks(input: LocationInput, platform: Platform): NavigationLink[] {
  if (!hasCoords(input)) return [];
  const coords = { lat: input.latitude, lng: input.longitude };
  const label = input.label ?? "Destino";
  const links: NavigationLink[] = [
    { id: "google", label: "Google Maps", href: googleMapsUrl(coords) },
    { id: "waze", label: "Waze", href: wazeUrl(coords) },
    { id: "uber", label: "Uber", href: uberUrl(coords, label) },
    { id: "99", label: "99", href: ninetyNineUrl() },
  ];
  if (platform === "ios") links.push({ id: "apple", label: "Apple Maps", href: appleMapsUrl(coords, label) });
  if (platform === "android") links.push({ id: "geo", label: "Outros apps de mapa", href: geoUrl(coords, label) });
  return links;
}

export function resolveLocationAction(input: LocationInput, platform: Platform = "other"): LocationAction {
  if (hasCoords(input)) {
    const coordsText = `${fmt(input.latitude)}, ${fmt(input.longitude)}`;
    const copyText = input.address ? `${input.address} (${coordsText})` : coordsText;
    return {
      kind: "tray",
      links: buildNavigationLinks(input, platform),
      copyText,
      shareText: input.label ? `${input.label} — ${copyText}` : copyText,
    };
  }
  if (input.mapsUrl) return { kind: "direct", href: input.mapsUrl };
  return null;
}
