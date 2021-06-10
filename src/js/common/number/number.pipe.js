import { Pipe } from 'rxcomp';

export class NumberPipe extends Pipe {

	static transform(value, suffix = '') {
		if (value != null) { // !!! keep losing
			return new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR' }).format(value);
			return `${value}${suffix}`;
		}
	}

}

NumberPipe.meta = {
	name: 'number',
};
