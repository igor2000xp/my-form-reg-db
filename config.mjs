import { getBuiltInRatings } from 'web-codegen-scorer';

/** @type {import("web-codegen-scorer").EnvironmentConfig} */
export default {
  displayName: 'My Fixed Angular App',
  clientSideFramework: 'angular',

  // Path to your Angular project root
  sourceDirectory: './fixed-angular-app',

  // Use built-in rating checks (a11y, security, etc.)
  ratings: getBuiltInRatings(),

  // (optional, empty if not using prompts)
  generationSystemPrompt: './dummy-prompt.md',

  // No generation prompts, just evaluation
  executablePrompts: ['./dummy-prompt.md'],

  // Or 'yarn', if you use yarn
  packageManager: 'npm',

  // Empty: will use default Angular build
  buildCommand: '',

  };
