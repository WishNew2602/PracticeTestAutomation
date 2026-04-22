import { test, expect } from '@playwright/test';

test('test', async ({ page }) => {
  await page.goto('https://www.google.com/sorry/index?continue=https://www.google.com/search%3Fq%3Dfacebook%26oq%3Dfacebook%26gs_lcrp%3DEgZjaHJvbWUyBggAEEUYOdIBCDQzNDlqMGoyqAIAsAIB%26sourceid%3Dchrome%26ie%3DUTF-8%26sei%3DpRLCabqoNPifseMP6-Ib&q=EhAkAUkAHLF4CeScAySffh82GKeliM4GIjD1DxqSzDlJDkdpvBtHdu0-VCwuX-7mXSjEpVMPihTxwqp6c2WX_rgG8ZKalJlJl_YyAVJaAUM');
});