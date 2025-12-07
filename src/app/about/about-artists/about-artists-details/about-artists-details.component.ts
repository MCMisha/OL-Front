import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from "rxjs";
import {ArtistService} from "../../../services/artist.service";
import {Artist} from "../../../models/artist";
import {ActivatedRoute, Router} from "@angular/router";
import { ArtistCategory } from '../../../models/enums/artist-category.enum';
import { ArtistCategoryLabels } from '../../../models/enums/artist-category-labels';
import {HelperService} from "../../../shared/services/helper.service";

@Component({
  selector: 'app-about-artists-details',
  templateUrl: './about-artists-details.component.html',
  styleUrl: './about-artists-details.component.scss'
})
export class AboutArtistsDetailsComponent implements OnInit, OnDestroy {
  artist!: Artist;
  isLoading = true;
  subscription = new Subscription();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private artistService: ArtistService,
    private helperService: HelperService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.subscription.add(
      this.artistService.getById(id).subscribe(artist => {
        this.artist = artist;
        this.isLoading = false;
      })
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getCategoryLabel(cat: number): string {
    return ArtistCategoryLabels[cat as ArtistCategory];
  }

  protected getCategoryClass(category: ArtistCategory) {
    return this.helperService.getCategoryNgClass(category);
  }
}
