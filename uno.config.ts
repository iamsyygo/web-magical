import {
  defineConfig,
  presetAttributify,
  presetUno,
  transformerDirectives,
} from 'unocss';
import { presetIcons } from '@unocss/preset-icons';

export default defineConfig({
  content: {},
  transformers: [transformerDirectives()],
  presets: [presetIcons(), presetUno(), presetAttributify()],
  rules: [],
});
