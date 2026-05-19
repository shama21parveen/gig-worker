import { Circle, CircleMarker, MapContainer, Popup, TileLayer } from 'react-leaflet';
import { AlertTriangle, BatteryCharging, LocateFixed, PhoneCall, ShieldCheck } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { PageHeader } from '@/components/ui/PageHeader';
import { ErrorState, LoadingState } from '@/components/ui/QueryStates';
import { useSafetyOverview } from '@/features/safety/useSafetyOverview';
import { useGeolocation } from '@/hooks/useGeolocation';
import { useI18n } from '@/hooks/useI18n';
import { env } from '@/lib/config/env';
import { formatDateTime } from '@/lib/utils/format';
import { getLocalizedText } from '@/lib/utils/localization';

const zoneColors = {
  low: '#248b71',
  medium: '#e88f12',
  high: '#ed4428',
};

export function SafetyCenterWorkspace() {
  const { t, language } = useI18n();
  const { data, isLoading, isError } = useSafetyOverview();
  const geolocation = useGeolocation();

  if (isLoading) return <LoadingState label={t('common.loading')} />;
  if (isError || !data) return <ErrorState title={t('common.error')} description="Safety telemetry could not be loaded." />;

  return (
    <div className="space-y-6">
      <PageHeader
        eyebrow="Worker safety"
        title={t('safety.title')}
        description={t('safety.subtitle')}
        action={<Button variant="danger">{t('safety.sos')}</Button>}
      />

      <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <Card>
          <p className="text-sm font-semibold text-slate-500">{t('safety.liveLocation')}</p>
          <div className="mt-4 flex items-center gap-3">
            <LocateFixed className="h-5 w-5 text-brand-700" />
            <div>
              <p className="font-semibold text-ink">{geolocation.error ? 'Permission needed' : 'Location active'}</p>
              <p className="text-xs text-slate-500">
                {geolocation.error ? geolocation.error : `${data.city} tracking ready`}
              </p>
            </div>
          </div>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Emergency contacts</p>
          <p className="mt-3 text-3xl font-extrabold text-ink">{data.contacts.length}</p>
          <p className="mt-2 text-xs text-slate-500">Primary and backup escalation paths configured</p>
        </Card>
        <Card>
          <p className="text-sm font-semibold text-slate-500">Battery readiness</p>
          <div className="mt-4 flex items-center gap-3">
            <BatteryCharging className="h-5 w-5 text-brand-700" />
            <p className="font-semibold text-ink">{data.status.batterySafe ? 'Safe for 4+ hours' : 'Charge recommended'}</p>
          </div>
        </Card>
        <Card className="bg-ink text-white">
          <p className="text-sm font-semibold text-brand-200">Route watch</p>
          <p className="mt-3 text-xl font-bold">{getLocalizedText(data.routeAlert.title, language)}</p>
          <p className="mt-2 text-sm text-slate-300">{getLocalizedText(data.routeAlert.body, language)}</p>
        </Card>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
        <Card className="overflow-hidden">
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-500">Risk-zone heatmap</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Area risk layers across Bengaluru south</h2>
          </div>
          <div className="h-[420px] overflow-hidden rounded-3xl">
            <MapContainer center={[12.925, 77.63]} zoom={12} scrollWheelZoom={false}>
              <TileLayer url={env.mapTileUrl} />
              {data.zones.map((zone) => (
                <Circle
                  key={zone.id}
                  center={[zone.latitude, zone.longitude]}
                  radius={850}
                  pathOptions={{
                    color: zoneColors[zone.risk],
                    fillColor: zoneColors[zone.risk],
                    fillOpacity: 0.2,
                  }}
                >
                  <Popup>
                    <strong>{zone.label}</strong>
                    <div>Risk: {zone.risk}</div>
                  </Popup>
                </Circle>
              ))}
              {geolocation.latitude && geolocation.longitude ? (
                <CircleMarker
                  center={[geolocation.latitude, geolocation.longitude]}
                  radius={10}
                  pathOptions={{ color: '#132033', fillColor: '#132033', fillOpacity: 1 }}
                >
                  <Popup>Your live location</Popup>
                </CircleMarker>
              ) : null}
            </MapContainer>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-danger-50 to-white">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-danger-700">Emergency workflow</p>
                <h2 className="mt-2 text-2xl font-bold text-ink">One-tap SOS panel</h2>
              </div>
              <AlertTriangle className="h-6 w-6 text-danger-600" />
            </div>
            <div className="mt-5 grid gap-3">
              <Button variant="danger" className="w-full justify-start">
                <PhoneCall className="mr-2 h-4 w-4" />
                Call emergency contact
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <LocateFixed className="mr-2 h-4 w-4" />
                Share current location
              </Button>
              <Button variant="secondary" className="w-full justify-start">
                <ShieldCheck className="mr-2 h-4 w-4" />
                Trigger safe-route alert
              </Button>
            </div>
          </Card>

          <Card>
            <p className="text-sm font-semibold text-slate-500">Emergency contacts</p>
            <div className="mt-4 space-y-3">
              {data.contacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between rounded-2xl bg-slate-50 px-4 py-3">
                  <div>
                    <p className="font-semibold text-ink">{contact.name}</p>
                    <p className="text-xs text-slate-500">{getLocalizedText(contact.relation, language)}</p>
                  </div>
                  <Badge tone="info">{contact.phone}</Badge>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <Card>
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-500">Recent incidents</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Feed from worker reports</h2>
          </div>
          <div className="space-y-3">
            {data.incidents.map((incident) => (
              <div key={incident.id} className="rounded-2xl border border-slate-100 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold text-ink">{incident.area}</p>
                    <p className="text-sm text-slate-500">{getLocalizedText(incident.type, language)}</p>
                  </div>
                  <Badge tone={incident.severity === 'high' ? 'danger' : incident.severity === 'medium' ? 'warning' : 'success'}>
                    {incident.severity}
                  </Badge>
                </div>
                <p className="mt-3 text-sm text-slate-600">{getLocalizedText(incident.note, language)}</p>
                <p className="mt-2 text-xs text-slate-400">{formatDateTime(incident.timestamp)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card>
          <div className="mb-5">
            <p className="text-sm font-semibold text-slate-500">Safety tips</p>
            <h2 className="mt-2 text-2xl font-bold text-ink">Shift-ready checklist</h2>
          </div>
          <div className="space-y-3">
            {data.tips.map((tip, index) => (
              <div key={index} className="rounded-2xl bg-slate-50 px-4 py-4">
                <p className="text-sm font-medium leading-6 text-slate-700">{getLocalizedText(tip, language)}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-brand-100 bg-brand-50 p-4">
            <p className="text-sm font-semibold text-brand-800">Last check-in</p>
            <p className="mt-1 text-sm text-brand-700">{formatDateTime(data.status.lastCheckIn)}</p>
          </div>
        </Card>
      </section>
    </div>
  );
}
