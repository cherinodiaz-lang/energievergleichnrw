# PHASE 5 — Formularvalidierung & Entschlackung

## Übersicht: Implementierte Änderungen

### ✅ Abgeschlossene Seiten

#### 1. **Stromvergleich NRW** (`/stromvergleich-nrw`)
- **Pflichtfelder:** PLZ, Verbrauch, Name, E-Mail
- **Optional:** Telefon
- **Validierung:** ✅ Implementiert mit `validateFormFields()`
- **Fehlermeldungen:** ✅ Deutsche 1-Satz-Meldungen
- **Bestätigung:** ✅ Sichtbar nach Submit
- **Weiterleitung:** ✅ Zu `/danke` nach 2 Sekunden
- **Datenschutz:** ✅ Link direkt am Submit-Button

#### 2. **Gasvergleich NRW** (`/gasvergleich-nrw`)
- **Pflichtfelder:** PLZ, Verbrauch, Name, E-Mail
- **Optional:** Telefon
- **Validierung:** ✅ Implementiert
- **Fehlermeldungen:** ✅ Deutsche 1-Satz-Meldungen
- **Bestätigung:** ✅ Sichtbar nach Submit
- **Weiterleitung:** ✅ Zu `/danke` nach 2 Sekunden
- **Datenschutz:** ✅ Link direkt am Submit-Button

---

### 🔄 Noch zu implementieren

#### 3. **Photovoltaik NRW** (`/photovoltaik-nrw`)
- **Pflichtfelder:** PLZ, Name, E-Mail
- **Optional:** Telefon, Dach-Info
- **Status:** Benötigt Validierung & Fehlermeldungen

#### 4. **Gewerbestrom** (`/gewerbestrom`)
- **Pflichtfelder:** PLZ, Verbrauch kWh, Name, E-Mail
- **Optional:** Telefon, Firma
- **Status:** Benötigt Validierung & Fehlermeldungen

#### 5. **Gewerbegas** (`/gewerbegas`)
- **Pflichtfelder:** PLZ, Verbrauch kWh, Name, E-Mail
- **Optional:** Telefon, Firma
- **Status:** Benötigt Validierung & Fehlermeldungen

#### 6. **Kontakt** (`/kontakt`)
- **Pflichtfelder:** Name, E-Mail
- **Optional:** Telefon
- **Status:** Benötigt Validierung & Fehlermeldungen

#### 7. **Home/Tarifrechner** (`/`)
- **Pflichtfelder:** PLZ, Verbrauch (oder Auswahl), Name, E-Mail
- **Optional:** Telefon
- **Status:** Benötigt Validierung & Fehlermeldungen

---

## Validierungsregeln (in `/src/lib/form-validation.ts`)

### Fehlermeldungen (Deutsch, 1 Satz)
```
- Erforderlich: "Dieses Feld ist erforderlich."
- E-Mail: "Bitte geben Sie eine gültige E-Mail-Adresse ein."
- Telefon: "Bitte geben Sie eine gültige Telefonnummer ein."
- PLZ: "Postleitzahl muss 5 Ziffern sein."
- Zahl: "Bitte geben Sie eine gültige Zahl ein."
```

### Validierungslogik
- **PLZ:** Exakt 5 Ziffern (`/^\d{5}$/`)
- **E-Mail:** Standard-Format (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`)
- **Telefon:** Mindestens 7 Zeichen mit Ziffern/Sonderzeichen
- **Zahl:** Positive Ganzzahl > 0

---

## Implementierungsmuster

### FormSubmissionDialog
```typescript
<FormSubmissionDialog
  isOpen={showFormDialog}
  onClose={() => setShowFormDialog(false)}
  formType="stromvergleich"
  formData={formData}
  requiredFields={['postleitzahl', 'verbrauch', 'name', 'email']}
  onSuccess={handleFormSuccess}
/>
```

### Validierung vor Submit
```typescript
const validation = validateFormFields(formData, FORM_CONFIGS.private);
if (!validation.valid) {
  setFormErrors(validation.errors);
  return;
}
```

### Fehleranzeige
```typescript
{Object.keys(formErrors).length > 0 && (
  <div className="bg-red-50 border border-red-200 rounded-lg p-4">
    {Object.entries(formErrors).map(([field, error]) => (
      <div key={field} className="flex items-start gap-2 text-red-700 text-sm">
        <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
        <span>{error}</span>
      </div>
    ))}
  </div>
)}
```

---

## Datenschutz-Integration

### Checkbox im FormSubmissionDialog
- ✅ Bereits implementiert in `/src/components/FormSubmissionDialog.tsx`
- ✅ Link zu `/datenschutz` direkt im Dialog
- ✅ Muss akzeptiert werden vor Submit

### Datenschutz-Link am Submit-Button
```typescript
<div className="flex items-start gap-3">
  <Checkbox id="privacy-consent" checked={privacyConsent} />
  <Label htmlFor="privacy-consent">
    Ich habe die{' '}
    <Link to={ROUTES.DATENSCHUTZ} className="text-primary hover:underline font-bold">
      Datenschutzhinweise
    </Link>
    {' '}gelesen und akzeptiert. *
  </Label>
</div>
```

---

## Weiterleitung nach Submit

### Bestätigung
- ✅ Sichtbare Bestätigungsmeldung im Dialog
- ✅ "Vielen Dank! Ihre Anfrage wurde erfolgreich übermittelt."
- ✅ Automatisches Schließen nach 3 Sekunden

### Redirect zu `/danke`
```typescript
setTimeout(() => {
  navigate('/danke');
}, 2000);
```

---

## Checkliste für verbleibende Seiten

### Photovoltaik NRW
- [ ] Import `validateFormFields` & `FORM_CONFIGS`
- [ ] State für `formErrors`
- [ ] Validierung in `handleSubmit()`
- [ ] Fehleranzeige im Form
- [ ] Datenschutz-Checkbox
- [ ] Redirect zu `/danke`

### Gewerbestrom
- [ ] Import `validateFormFields` & `FORM_CONFIGS`
- [ ] State für `formErrors`
- [ ] Validierung in `handleSubmit()`
- [ ] Fehleranzeige im Form
- [ ] Datenschutz-Checkbox
- [ ] Redirect zu `/danke`

### Gewerbegas
- [ ] Import `validateFormFields` & `FORM_CONFIGS`
- [ ] State für `formErrors`
- [ ] Validierung in `handleSubmit()`
- [ ] Fehleranzeige im Form
- [ ] Datenschutz-Checkbox
- [ ] Redirect zu `/danke`

### Kontakt
- [ ] Import `validateFormFields` & `FORM_CONFIGS`
- [ ] State für `formErrors`
- [ ] Validierung in `handleSubmit()`
- [ ] Fehleranzeige im Form
- [ ] Datenschutz-Checkbox
- [ ] Redirect zu `/danke`

### Home
- [ ] Import `validateFormFields` & `FORM_CONFIGS`
- [ ] State für `formErrors`
- [ ] Validierung in `handleSubmit()`
- [ ] Fehleranzeige im Form
- [ ] Datenschutz-Checkbox
- [ ] Redirect zu `/danke`

---

## Ergebnis pro Formular

| Seite | Pflichtfelder | Validierung | Fehler | Bestätigung | Weiterleitung | Datenschutz |
|-------|---------------|-------------|--------|-------------|---------------|-------------|
| Stromvergleich | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Gasvergleich | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| Photovoltaik | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| Gewerbestrom | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| Gewerbegas | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| Kontakt | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |
| Home | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ | ⏳ |

---

## Notizen

- **FormSubmissionDialog:** Bereits vollständig implementiert mit Datenschutz-Checkbox
- **Validierungsfunktionen:** Zentral in `/src/lib/form-validation.ts`
- **Fehlerbehandlung:** Konsistent über alle Formulare
- **UX:** Fehler werden inline angezeigt, nicht als Alert
- **Accessibility:** AlertCircle-Icons für bessere Sichtbarkeit
