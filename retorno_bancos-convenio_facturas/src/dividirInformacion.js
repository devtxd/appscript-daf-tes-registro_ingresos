async function dividirInformacion() {
  await createTemplates();
  await equivalences();
  await consolidar();
  await validateSplitRows();
}
