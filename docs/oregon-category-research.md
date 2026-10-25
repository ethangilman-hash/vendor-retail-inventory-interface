# Oregon Dutchie inventory preset research

Research date: October 24, 2026 (Pacific).

## Conclusion
Use eight main inventory groups: Flower, Pre-Rolls, Vaporizers, Concentrates, Edibles, Tinctures, Topicals, and Accessories. Flower, Pre-Rolls, Vaporizers, Concentrates, and Edibles recur across the sampled menus. Tinctures, Topicals, and Accessories recur on several menus, with store-dependent availability.

This is a qualitative public-menu sample, not a statewide census, statistically representative frequency estimate, SKU census, or sales ranking. Public Dutchie E-Commerce menus can be powered by other POS systems, so a Dutchie storefront does not prove a retailer uses Dutchie POS. Several pages exposed only navigation, search-indexed content, or temporarily unavailable menus. Subcategory frequencies could not be measured reliably. No customer, order, or private POS data was accessed.

## Sample evidence
- Cannabend (Bend): Flower, Pre-Rolls, Vaporizers, Concentrates, Edibles, Tinctures, Topicals on fetched menu navigation.
- Salem Organics (Salem): Flower, Pre-Rolls, Vaporizers, Concentrates, Edibles, Tinctures, Accessories on fetched menu navigation.
- OG Collective, Commercial St (Salem): core categories plus Tinctures, Topicals, CBD, Accessories, Apparel on fetched category navigation. Indexed product listings distinguish cured/live resin cartridges, AIOs, single gummies, gummy packs, cured/live resin dabs, and diamonds/sauce.
- Substance, Olympic St (Springfield): indexed Dutchie menu shows core categories, Topicals, Accessories; product examples include badder, shatter, cured resin, syrup, and transdermal patches.
- Lemonnade (Milwaukie): indexed Dutchie navigation shows core categories, Tinctures, Topicals, CBD, Accessories. Direct page fetch was unavailable.
- Dark Matter (Eugene): indexed Dutchie navigation shows core categories, Topicals, CBD, Accessories, Apparel. Direct page fetch was empty.
- Natural Remedies East (Portland): store site confirms Dutchie ordering and flower, concentrates/cartridges, edibles, pre-rolls, tinctures, topicals, and clones. The embedded live menu was unavailable, so it was supporting context only.

Geographic limits: Bend, Salem, Springfield, Eugene, and Portland metro; Southern/Eastern Oregon and the coast are not adequately covered. This preset must be validated against the pilot retailer's catalog.

## Mapping design
Dutchie POS categories are customizable; Dutchie E-Commerce uses standardized global mappings. Keep source category/subcategory separately from our normalized category. A product needs one inventory identity, a format, extract type, pack size, and any store-specific price tier. Do not count the same AIO under both extract type and hardware format. Review uncertain matches manually. These are planning labels, not tax, traceability, or purchase-limit classifications.

## Implemented groups

### Flower

Bulk / Loose Flower; Pre-Packaged.

Your ounce-special and $3/$5/$7/$9/$12/$14-per-gram planning tiers are preserved. Strain type and weight are separate attributes.

### Pre-Rolls

Non-Infused; Infused.

Single and multi-pack are packaging formats. Keep your four planning sections.

### Vaporizers

Cartridge; All-in-One / Disposable; Pod.

Distillate, Live Resin, Cured Resin, and Rosin are extract attributes. A live-resin AIO is counted once, in the AIO section.

### Concentrates

Live Resin; Cured Resin; Rosin / Live Rosin; Badder / Budder; Shatter; Diamonds / Sauce; Hash / Kief; RSO / FECO.

A practical mix of product types and planning groups, not an exact list of Dutchie global subcategory IDs. RSO defaults here; retain each store’s original mapping.

### Edibles

Gummies; Chocolates; Drinks; Baked Goods; Hard Candy / Mints; Capsules / Tablets; Syrups / Drink Mixers.

Single gummy and multi-gummy packs remain separate planning sections. Syrups may be mapped differently by store.

### Tinctures

Drops / Oils.

Separated from Edibles. Specific source subcategories must be confirmed from the connected retailer catalog.

### Topicals

Lotions / Creams; Balms / Salves; Transdermal Patches.

Added as a separate category. Groupings are a working preset and require store-level review.

### Accessories

Batteries / Hardware; Papers / Cones; Glass / Tools.

Non-cannabis inventory stays separate from cannabis categories. Store names and tax/compliance mappings are not overwritten.

## Additional decisions
- Preserve ounce-special and $3/$5/$7/$9/$12/$14-per-gram flower tiers as custom planning tiers, not claimed Dutchie standard subcategories.
- Preserve single/multi-pack gummies and the four pre-roll planning groups.
- Move the prototype tincture row to Tinctures; default RSO/FECO to Concentrates with store override required. Syrups remain an Edibles planning group until the retailer mapping is known.
- Add missing baked goods, hard candy/mints, capsules/tablets, cured-resin cartridges, pods, concentrates, topicals, and accessories as fictional sample sections.
- CBD is a cross-category attribute by default; Apparel and Seeds/Clones are optional store-dependent groups, not assumed stocked.
- All new sample sections start with zero proposed purchases. Existing saved budgets, targets, and 22 quantities migrate by stable legacy index; the expanded plan returns to Draft for review. Original v2 browser data is retained.
- No live Dutchie or LeafLink catalog was edited.

## Primary sources

- [Dutchie category configuration](https://support.dutchie.com/hc/en-us/articles/26905812429459-Manage-product-categories-in-Dutchie-POS)
- [Dutchie subcategory guide](https://support.dutchie.com/hc/en-us/articles/12883794028947-Use-subcategories-in-Dutchie-E-Commerce-to-improve-product-search)
- [Cannabend · Bend](https://dutchie.com/stores/cannabend)
- [Salem Organics · Salem](https://dutchie.com/stores/salem-organics)
- [OG Collective · Salem](https://dutchie.com/stores/og-collective-commercial-st)
- [Substance · Springfield](https://dutchie.com/stores/substance-or-olympic)
- [Lemonnade · Milwaukie](https://dutchie.com/stores/lemonnade-milwaukie)
- [Dark Matter · Eugene](https://dutchie.com/stores/dark-matter-eugene)
- [Natural Remedies East](https://www.nrpdx.com/east/menu/)
