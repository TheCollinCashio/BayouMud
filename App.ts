import RibServer from 'rib-server';
import IClientFunctions from './interfaces/IClientFunctions';

let instance = null;

export default function(): RibServer<IClientFunctions> {
    if (instance !== null) {
        return instance;
    } else {
        instance = new RibServer("/", false);
        return instance;
    }
}
