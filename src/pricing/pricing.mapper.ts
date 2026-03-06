import { ServiceComponent } from "../service-components/service-component.entity";
import { ServiceMultiplier } from "../service-multipliers/service-multiplier.entity";

export const mapComponents = (components: ServiceComponent[]) => {
    return components.reduce<Record<string, any>>((acc, component) => {
        const rate = component.rates?.[0]; // latest / active rate

        if (!rate) {
            throw new Error(`No active rate for component ${component.code}`);
        }

        acc[component.code] = {
            id: component.id,
            code: component.code,
            label: component.label,
            type: component.type,
            perUnit: rate?.per_unit_price ?? 0,
            flat: rate?.flat_price ?? 0,
            isFlatRate: component.is_flat_rate,
            section: component.section,
        };

        return acc;
    }, {});
}

export const mapMultipliers = (multipliers: ServiceMultiplier[]) => {
    return multipliers.reduce<Record<string, any>>((acc, m) => {
        acc[m.code] = { value: m.value, label: m.name, code: m.code, description: m.description };
        return acc;
    }, {});
}