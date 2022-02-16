import ConfigData from '@/config/config.json';

interface IConfig {
  modules: any;
  url: any;
  env: string;
}

export default new class Config implements IConfig {
  modules: any;
  url: any;
  env: string;

  constructor() {
    this.modules = ConfigData.services;
    this.url = Object.keys(this.modules).reduce((cur, module) => {
      cur[module] = (url) => this.getUrl(module, url);

      return cur;
    }, {});
    this.env = ConfigData.env;
  }

  getUrl(module, url = '') {
    if (this.modules[module] === undefined) {
      console.error('Неверно задано название модуля', module);
    }

    return `${this.modules[module]}${url}`;
  }
};
