export class PricingEngine {
  calculate(
    components: any[],
    multipliers: any[],
    items: { componentId: string; quantity: number }[],
    appliedMultipliers: string[],
  ) {
    let subtotal = 0;

    const breakdown: any[] = [];

    for (const item of items) {
      const component = components.find((c) => c.id === item.componentId);

      if (!component) {
        throw new Error(`Invalid component ${item.componentId}`);
      }

      const price = component.isFlatRate
        ? component.flat
        : component.perUnit * item.quantity;

      subtotal += price;

      breakdown.push({
        type: 'component',
        componentId: component.id,
        name: component.label,
        quantity: item.quantity,
        unitPrice: component.perUnit,
        total: price,
      });
    }

    let multiplierTotal = 0;

    for (const multiplier of multipliers) {
      if (!appliedMultipliers.includes(multiplier.code)) continue;

      let value = 0;

      if (multiplier.type === 'percentage') {
        value = (subtotal * multiplier.value) / 100;
      }

      if (multiplier.type === 'fixed') {
        value = multiplier.value;
      }

      multiplierTotal += value;

      breakdown.push({
        type: 'multiplier',
        multiplierId: multiplier.id,
        name: multiplier.name,
        value,
      });
    }

    const total = subtotal + multiplierTotal;

    return {
      subtotal,
      multiplierTotal,
      total,
      breakdown,
    };
  }
}
