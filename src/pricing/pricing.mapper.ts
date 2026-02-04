import { ServiceComponent } from "src/service-components/service-component.entity";
import { ServiceMultiplier } from "src/service-multipliers/service-multiplier.entity";

export const mapComponents = (components: ServiceComponent[]) => {
    return components.reduce<Record<string, any>>((acc, component) => {
        const rate = component.rates?.[0]; // latest / active rate

        acc[component.code] = {
            id: component.id,
            label: component.label,
            type: component.type,
            perUnit: rate?.per_unit_price ?? null,
            flat: rate?.flat_price ?? null,
        };

        return acc;
    }, {});
}

export const mapMultipliers = (multipliers: ServiceMultiplier[]) => {
    return multipliers.reduce<Record<string, number>>((acc, m) => {
        acc[m.code] = m.value;
        return acc;
    }, {});
}