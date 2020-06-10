/* TODO get rid of undefined + see if public methods make sense*/
export class Visitor {
    public id: number | undefined = undefined;
    public firstName: string | undefined = undefined;
    public lastName: string | undefined = undefined;
    public date: string | undefined = undefined;
    public notes: string | undefined = undefined;
    public isSignedOut: boolean | undefined = undefined;
  
    constructor(instanceData?: any) {
      if (instanceData) {
        this.deserialize(instanceData);
      }
    }
  
    private deserialize(instanceData: any) {
      const keys = Object.keys(this);
      for (const key of keys) {
        if (instanceData.hasOwnProperty(key)) {
          this[key] = instanceData[key];
        }
      }
    }
  }

/* Change name to processVisitor function? Idk, also combine shared code here, add error processing */
export function getAllUsers(callback: any) {
    return fetch('/entries')
            .then(res => res.json())
            .then(res => {
                    /*TODO: Is this the right way to typecast*/
                    let visitors: Visitor[] = [];
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    callback(visitors);
            })
  }

  
export function changeVisitor(visitor: Visitor, callback: any){
    console.log(visitor);
    return fetch('/entries', {
      method: 'PATCH',
      body: JSON.stringify({visitor})})
            .then(res => res.json())
            .then(res => {
                    let visitors: Visitor[] = [];
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    callback(visitors);
            })
  }


export function addUser(visitor: Visitor, callback: any) {
    return fetch('/entries', {
      method: 'POST',
      body: JSON.stringify({visitor})})
            .then(res => res.json())
            .then(res => {
                    let visitors: Visitor[] = [];
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    callback(visitors);
            })
  }

export function searchUsers(params: any, callback: any) {
    const paramString = new URLSearchParams(params);
    return fetch(`/entries?${paramString.toString()}`)
            .then(res => res.json())
            .then(res => {
                    let visitors: Visitor[] = [];
                    res["visitors"].forEach(element => {
                      visitors.push(new Visitor(element));
                    });
                    callback(visitors);
            });
  }



