package VacanzaLambda.src.main.java.musicplaylistservice.dependency;

import VacanzaLambda.src.main.java.musicplaylistservice.activity.CreateItineraryActivity;

import VacanzaLambda.src.main.java.musicplaylistservice.dependency.DaoModule;
import VacanzaLambda.src.main.java.musicplaylistservice.dependency.MetricsModule;
import dagger.Component;

import javax.inject.Singleton;

/**
 * Dagger component for providing dependency injection in the Music Itinerary Service.
 */
@Singleton
@Component(modules = {DaoModule.class, MetricsModule.class})
public interface ServiceComponent {
    /**
     * Provides the relevant activity.
     * @return AddSongToPlaylistActivity
     */
    CreateItineraryActivity provideCreateItineraryActivity();

    /**
     * Provides the relevant activity.
     * @return AddSongToPlaylistActivity
     */

}
