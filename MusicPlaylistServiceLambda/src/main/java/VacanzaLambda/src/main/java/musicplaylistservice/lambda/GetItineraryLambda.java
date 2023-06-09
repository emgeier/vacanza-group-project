package VacanzaLambda.src.main.java.musicplaylistservice.lambda;

import VacanzaLambda.src.main.java.musicplaylistservice.activity.requests.GetItineraryRequest;
import VacanzaLambda.src.main.java.musicplaylistservice.activity.results.GetItineraryResult;
import com.amazonaws.services.lambda.runtime.Context;
import com.amazonaws.services.lambda.runtime.RequestHandler;


import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;

public class GetItineraryLambda
        extends LambdaActivityRunner<GetItineraryRequest, GetItineraryResult>
        implements RequestHandler<LambdaRequest<GetItineraryRequest>, LambdaResponse> {

    private final Logger log = LogManager.getLogger();

    @Override
    public LambdaResponse handleRequest(LambdaRequest<GetItineraryRequest> input, Context context) {
        log.info("handleRequest");
        return super.runActivity(
                () -> input.fromPath(path ->
                        GetItineraryRequest.builder()
                                .withEmail(path.get("email"))
                                .withTripName(path.get("tripName"))
                                .build()),
                (request, serviceComponent) ->
                        serviceComponent.provideGetItineraryActivity().handleRequest(request)
        );
    }
    }

