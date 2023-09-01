import { Color } from '../color';

const numberParser = (value: string): number => {
    return parseFloat(value);
};

const stringParser = (value: string): string => {
    return value;
};

type Parser = typeof numberParser | typeof stringParser;

type AttributeType<P extends Parser> = P extends typeof numberParser ? number : string | null;

const getAttributes = <P extends Parser>(
    xmlDoc: Document,
    qualifiedName: string,
    attributes: string[],
    parser: P,
): AttributeType<P>[] => {
    const node = xmlDoc.getElementsByTagName(qualifiedName)[0];
    if (!node) {
        console.warn(`Node ${qualifiedName} not found`);
        return attributes.map(() => null as AttributeType<P>);
    }
    const result: AttributeType<P>[] = [];
    for (let i = 0; i < attributes.length; i++) {
        const attribute = node.getAttribute(attributes[i]);
        const value = (attribute ? parser(attribute) : null) as AttributeType<P>;
        result.push(value);
    }
    return result;
};

export const getAttributesAsNumber = (
    xmlDoc: Document,
    qualifiedName: string,
    attributes: string[] = ['value'],
): (number | null)[] => {
    return getAttributes(xmlDoc, qualifiedName, attributes, numberParser);
};

export const getAttributesAsString = (
    xmlDoc: Document,
    qualifiedName: string,
    attributes: string[] = ['value'],
): (string | null)[] => {
    return getAttributes(xmlDoc, qualifiedName, attributes, stringParser);
};

export const getAttributeAsColor = (xmlDoc: Document, qualifiedName: string): Color => {
    const [red, green, blue, alpha] = getAttributes(
        xmlDoc,
        qualifiedName,
        ['red', 'green', 'blue', 'alpha'],
        numberParser,
    );
    return new Color(red, green, blue, alpha);
};

export const getAsColor = (color: [number, number, number, number]): Color => {
    const [red, green, blue, alpha] = color;
    return new Color(red, green, blue, alpha);
};

export const DEG_TO_RAD = Math.PI / 180;
