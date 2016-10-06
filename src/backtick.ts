import { spawnSync } from 'child_process';
import { forEach, drop, reduce, concat, head } from 'lodash';

export function sh(literals, ...substitutes): string {

    function resolveString(lits: string[], subs: string[]): {cmd: string, args: string[]} {
        let { cmdString } = reduce(
            lits, 
            ({cmdString, crap}, l) =>
                l === ''
                    // perform substitution
                    ? {cmdString: cmdString + head(crap), crap: drop(crap, 1)}
                    : {cmdString: cmdString + l, crap}
            ,
            {cmdString: '', crap: subs}
        );

        let parts = cmdString.split(' ');

        let cmd = parts[0];
        let args = drop(parts, 1);

        return {cmd, args};
    }

    let {cmd, args} = resolveString(literals as string[], substitutes as string[]);
    let proc = spawnSync(cmd, args, {});

    if (proc.status) {
        console.log(proc.stderr.toString());
        throw `${cmd} with args ${args.join(',')} exited with code ${proc.status}`;
    } else {
        return proc.stdout.toString().trim();
    }
}
