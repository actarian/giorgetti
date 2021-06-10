import { Pipe } from 'rxcomp';

export class NumberPipe extends Pipe {

	static transform(value, language = 'en-IN', options = {}) {
		if (value != null) { // !!! keep losing
			return new Intl.NumberFormat(language, options).format(value);
		}
	}

}

NumberPipe.meta = {
	name: 'number',
};
