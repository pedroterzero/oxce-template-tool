import { readFileSync } from "fs";
import { compile } from "handlebars";

export class Templates {
    private static templates: {[key: string]: string} = {};
    private static templater: {[key: string]: HandlebarsTemplateDelegate<any>} = {};

    public static get(name: string): string {
        this.load(name);
        return this.templates[name];
    }

    public static template(name: string, values: Record<string, unknown>): string {
        this.load(name);
        return this.templater[name](values);
    }

    private static load(name: string) {
        if (name in this.templates) {
            return;
        }
        
        const file = readFileSync(name + '.template.yscript').toString();

        this.templates[name] = file;
        this.templater[name] = compile(this.templates[name]);
    }
}