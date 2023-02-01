import { Component, OnInit } from '@angular/core';
import { debounceTime, Observable, tap } from 'rxjs';
import { FormControl, Validators } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

	section1: string = 'gray';
  section2: string = 'gray';
  section3: string = 'gray';
	passwordStrength = 0
	password$!: Observable<string | null>

	textControl = new FormControl('', [
		Validators.minLength(8),
      Validators.required,
	]);

	constructor() {
	}

	ngOnInit(): void {
		this.password$ = this.textControl.valueChanges.pipe(
			debounceTime(500),
			tap((data) => {
				const letters = /[a-z]+/.test(data?.toLocaleLowerCase()!);
				const numbers = /[0-9]+/.test(data!);
				const symbols = /[$-/:-?{-~!"^_@#`\[\]]/g.test(data!);
				const matches =[letters, numbers, symbols];
				let strength = 0;
				for (const match of matches) {
					strength += match === true ? 1 : 0;
				}
				this.passwordStrength = strength
				if (data === '') {
					this.section1 = 'gray'
					this.section2 = 'gray'
					this.section3 = 'gray'
				} else if (data?.length! < 8) {
					this.section1 = 'red'
					this.section2 = 'red'
					this.section3 = 'red'
				} else switch(strength) {
					case 1:
						this.section1 = 'red'
						this.section2 = 'grey'
						this.section3 = 'grey'
						break;
					case 2:
						this.section1 = 'yellow'
						this.section2 = 'yellow'
						this.section3 = 'grey'
						break;
					case 3:
						this.section1 = 'green'
						this.section2 = 'green'
						this.section3 = 'green'
						break;
				}
					
			}
				)
		)
		
	}

	butt() {
		console.log(this.passwordStrength)
	}

}
