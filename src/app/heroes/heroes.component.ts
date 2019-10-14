import { Component, OnInit } from '@angular/core';
import { Hero } from '../hero';
import { HeroService } from '../hero.service';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css']
})
export class HeroesComponent implements OnInit {

  heroes: Hero[];

  selectedHero: Hero;

  constructor(private heroService: HeroService) { }

  ngOnInit() {
    this.getHeroes();
  }

  getHeroes() {
    console.log('Antes');
    this.heroService.getHeroes().subscribe(
      // 1 //this.cogerLlamada.bind(this)

      // 2 //function(heroes: Hero[]) {
      // 2 //  console.log('cogerLlamada2', heroes);
      // 2 //  this.heroes = heroes;
      // 2 //}.bind(this)

      // original // heroes => this.heroes = heroes

      (heroesRecibidos: Hero[]) => {
        console.log('cogerLlamada Definitivo', heroesRecibidos);
        this.heroes = heroesRecibidos;
      }
    );
    console.log('Después');
  }

  // 1 // cogerLlamada(heroes: Hero[]) {
  // 1 //   console.log('cogerLlamada', heroes);
  // 1 //   this.heroes = heroes;
  // 1 // }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.heroService.addHero({ name } as Hero)
      .subscribe((hero: Hero) => {
        this.heroes.push(hero);
      });
  }

  delete(hero: Hero): void {
    this.heroService.deleteHero(hero).subscribe(
      () => this.heroes = this.heroes.filter(h => h !== hero)
    );
  }
}
