export function chdir<T>(to: string | undefined, todo: () => T): T | undefined {
    let old = process.cwd();
    let ret;
    if (to)
        process.chdir(to);
    else
        process.chdir(process.env.HOME);
    try {
        ret = todo();
    } finally {
        process.chdir(old);
    }

    return ret as T | undefined;
}