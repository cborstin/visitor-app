/* TODO get rid of undefined + see if public methods make sense*/
export class Visitor {
    public id: number | undefined = undefined;
    public firstName: string | undefined = undefined;
    public lastName: string | undefined = undefined;
    public date: string | undefined = undefined;
    public notes: string | undefined = undefined;
    public isSignedOut: boolean | undefined = undefined;
  
    constructor(instanceData?: Visitor) {
      if (instanceData) {
        this.deserialize(instanceData);
      }
    }
  
    private deserialize(instanceData: Visitor) {
      // Note this.active will not be listed in keys since it's declared, but not defined
      const keys = Object.keys(this);
  
      for (const key of keys) {
        if (instanceData.hasOwnProperty(key)) {
          this[key] = instanceData[key];
        }
      }
    }
  }



