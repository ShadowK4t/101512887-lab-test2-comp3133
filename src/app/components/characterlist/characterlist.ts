import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HpService } from '../../services/hp';
import { Character } from '../../models/character';

@Component({
  selector: 'app-characterlist',
  imports: [RouterLink, MatCardModule, MatProgressSpinnerModule],
  templateUrl: './characterlist.html',
  styleUrl: './characterlist.css'
})
export class Characterlist implements OnInit {
  characters = signal<Character[]>([]);
  isLoading = signal<boolean>(true);
  hasError = signal<boolean>(false);

  constructor(private hpService: HpService) {}

  ngOnInit(): void {
    this.hpService.getAllCharacters().subscribe({
      next: (data) => {
        this.characters.set(data);
        this.isLoading.set(false);
      },
      error: () => {
        this.hasError.set(true);
        this.isLoading.set(false);
      }
    });
  }
}