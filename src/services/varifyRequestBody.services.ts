import { Request } from 'express';
const missingKeys = (req: Request, keys: string[]): string[] => {
    let missing: string[] = [];
    const body = req.body;
    if (req.body == null) return keys;
    else {
        for (const key of keys) {
            if (body && body.hasOwnProperty(`${key}`) == false)
                missing.push(key);
        }
        return missing;
    }
};
export default missingKeys;
