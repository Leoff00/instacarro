export class Container {
  private dependencies: { [name: string]: any } = {};

  register<T>(name: string, dependency: T): void {
    this.dependencies[name] = dependency;
  }

  list() {
    return this.dependencies;
  }

  resolve<T>(name: string): T {
    if (!(name in this.dependencies)) {
      throw new Error(`Dependency '${name}' not registered.`);
    }

    return this.dependencies[name];
  }
}
