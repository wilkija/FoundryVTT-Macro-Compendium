main()

async function main() {
    // Is a token selected? If not, report error
    if (canvas.tokens.controlled == 0 || canvas.tokens.controlled.length > 1) {
        ui.notifications.error('Please select a single token');
        return;
    }
    let actor = canvas.tokens.controlled[0].actor;

    // Does the token have a potion?
    let healthPotion = actor.data.items.find(item => item.data.name == "Potion of Healing");
    if (healthPotion == null || healthPotion == undefined) {
        ui.notificaitons.error('No health potions left'); // Otherwise report error
    }

    // Is token is max health?
    if (actor.data.data.attributes.hp.value == actor.data.data.attributes.hp.max) {
        ui.notificaitons.error('Actor is already at max health');
        return; // If so, no action
    }

    // Subtract a potion from the token
    await healthPotion.update({'data.quantity': healthPotion.data.data.quantity - 1})
    if (healthPotion.data.data.quantity < 1) {
        healthPotion.delete();
    }

    // Increase the token's health appropriately
    // Roll for health to be applied
    let roll = await new Roll(healthPotion.labels.damage).roll();
    let gainedHp = roll.total;
    //// Would new health be greater than the max health?
    ////// If so, set new health as max health
    let newHealth = actor.data.data.attributes.hp.value + gainedHp;
    if (newHealth > actor.data.data.attributes.hp.max) {
        newHealth = actor.data.data.attributes.hp.max;
    }

    // Update the actor health
    await actor.update({'data.attributes.hp.value': newHealth});
    await ui.notifications.info(`${actor.data.name} gained ${gainedHp} hp a Potion of Healing`);
}
