import 'dotenv/config';

/**
 * @class EnvManager
 */
export class EnvManager {
  /**
   * @constructor EnvManager
   * @param {*} env environmental object
   */
  constructor(env) {
    this.env = env;
  }

  /**
   * @returns {*} void
   */
  expectedEnvValues() {
    const program = ['NODE_ENV', 'PORT', 'SECRET'];
    return [...program];
  }

  /**
   * @param {*} key
   * @param {*} throwOnMissing
   * @returns {*} void
   */
  getEnvValue(key, throwOnMissing = true) {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`\tmissing env.${key}.\n \n\tPlease add ${key} in .env file\n`);
    }
    return value;
  }

  /**
   * @returns {*} void
   */
  getApplicationPort() {
    return parseInt(this.getEnvValue('PORT'), 10);
  }

  /**
   * @returns {*} void
   */
  ensureEnvValues() {
    this.expectedEnvValues().forEach(k => this.getEnvValue(k, true));
    return new EnvManager(process.env);
  }

  /**
   * @returns {*} void
   */
  isProduction() {
    const mode = this.getEnvValue('NODE_ENV', false);
    return mode !== 'development';
  }
}

const envManager = new EnvManager(process.env)
  .ensureEnvValues();

export { envManager };
