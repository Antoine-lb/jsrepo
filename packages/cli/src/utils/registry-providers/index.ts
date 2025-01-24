import { github } from "./github";

export type ParseOptions = {
	/** Set true when the provided path ends with `<category>/<block>` */
	fullyQualified?: boolean;
};

export type ParseResult = {
	/** a universal url ex: `https://github.com/ieedan/std -> github/ieedan/std` */
	url: string;
	/** The block specifier `<category>/<block>` */
	specifier?: string;
};

export type StateOptions = {
	token?: string;
};

export interface RegistryProvider {
	/** Short name for the provider that will be used when it is displayed to the user */
	name: string;
	/** Used to determine if the provided url belongs to this provider
	 *
	 * @param url
	 * @returns
	 */
	matches: (url: string) => boolean;
	/** Parse a URL that belongs to the provider
	 *
	 * @param url
	 * @param opts
	 * @returns
	 */
	parse: (url: string, opts: ParseOptions) => ParseResult;
	/** Gets the provider state by parsing the url and taking care of any loose ends
	 *
	 * @param url
	 * @returns
	 */
	state: (url: string, opts?: StateOptions) => Promise<RegistryProviderState>;
	/** Returns a URL to the raw path of the resource provided in the resourcePath
	 *
	 * @param repoPath
	 * @param resourcePath
	 * @returns
	 */
	resolveRaw: (state: RegistryProviderState, resourcePath: string) => Promise<URL>;
	/** Different providers use different authorization schemes. 
	 *  Provide this method with a token to get the key value pair for the authorization header.
	 *
	 * @param token
	 * @returns
	 */
	authHeader: (token: string) => [string, string];
}

/** Pass this to the `.provider` property of this to access the methods for this provider */
export interface RegistryProviderState {
	url: string;
	provider: RegistryProvider;
}

const providers = [github];
