module.exports = {
  '*.ts': [() => 'tsc --skipLibCheck --noEmit'],
  '*.{ts,js}': ['eslint --cache --fix'],
  '*.{md,json}': ['prettier --write'],
};
