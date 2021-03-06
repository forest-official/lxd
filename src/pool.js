
import path from 'path';
import Volume from './volume';

class Pool {
  constructor(client, name) {
    this.client = client;
    this.config = { name, };
  }

  name() {
    return this.config.name;
  }

  url() {
    return '/storage-pools/' + this.name() + '/volumes/custom';
  }

  async list() {
    // Get custom volumes
    let list = await this.client.operation().get(this.url());

    // Only get volume names
    return list.map(uri => path.basename(uri));
  }

  get_volume(name) {
    return (new Volume(this, name));
  }
}

export default Pool;
