import { defineConfig, presetAttributify, presetUno, transformerDirectives } from 'unocss';
import { presetIcons } from '@unocss/preset-icons';
import { presetAnimations } from 'unocss-preset-animations';

export default defineConfig({
  content: {},
  transformers: [transformerDirectives()],
  presets: [presetIcons(), presetUno(), presetAttributify(), presetAnimations()],
  rules: [],
});
