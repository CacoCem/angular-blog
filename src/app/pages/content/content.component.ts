import { assertInInjectionContext, Component } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { dataFake } from '../../data/dataFake';

@Component({
  selector: 'app-content',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentComponent {
  photoCover:string= ""
  contentTitle:string = ""
  contentDescription:string = "Sandero"
  private id:string | null = "0"

  constructor (
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( value =>
      this.id = value.get("id"))

      this.setValuesToComponent(this.id)
  }

  setValuesToComponent(id: string | null) {
    if (id !== null) {
      const result = dataFake.filter(article => article.id === id);
      if (result.length > 0) {
        this.photoCover = result[0].photoCover;
        this.contentTitle = result[0].title;
        this.contentDescription = result[0].description;
      } else {
        // Trate o caso em que nenhum elemento foi encontrado
        console.log('Nenhum elemento encontrado com o ID:', id);
      }
    } else {
      // Trate o caso em que o id é null
      console.log('ID is null');
    }
  }
}
