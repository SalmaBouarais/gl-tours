import { Subscription } from "rxjs";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Offer } from "src/app/models/offer.model";
import { ActivatedRoute } from "@angular/router";
import { NavController } from "@ionic/angular";
import { OffersService } from "../../../../services/offers.service";

@Component({
  selector: "app-offer-detail",
  templateUrl: "./offer-detail.page.html",
  styleUrls: ["./offer-detail.page.scss"]
})
export class OfferDetailPage implements OnInit, OnDestroy {
  offer: Offer;
  offerSub: Subscription;

  constructor(
    private route: ActivatedRoute,
    private navCtrl: NavController,
    private offerService: OffersService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe(paramMap => {
      if (!paramMap.has("offerId")) {
        this.navCtrl.navigateBack("/places/tabs/offers");
        return;
      }
      this.offerSub = this.offerService
        .getById(parseInt(paramMap.get("offerId")))
        .subscribe(offer => (this.offer = offer));
    });
  }

  ngOnDestroy(): void {
    if (this.offerSub) this.offerSub.unsubscribe();
  }
}
