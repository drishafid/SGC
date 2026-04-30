<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\RendezVous;
use Illuminate\Http\Request;
use Carbon\Carbon;

class RendezVousController extends Controller
{
    public function index()
    {
        return response()->json(RendezVous::with('client')->orderBy('date', 'desc')->get());
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'note' => 'nullable|string',
            'client_id' => 'required|exists:clients,id',
        ]);

        $rdv = RendezVous::create($validated);

        return response()->json($rdv->load('client'), 201);
    }

    public function show(RendezVous $rendezVous)
    {
        return response()->json($rendezVous->load('client'));
    }

    public function update(Request $request, RendezVous $rendezVous)
    {
        $validated = $request->validate([
            'date' => 'required|date',
            'note' => 'nullable|string',
            'client_id' => 'required|exists:clients,id',
        ]);

        $rendezVous->update($validated);

        return response()->json($rendezVous->load('client'));
    }

    public function destroy(RendezVous $rendezVous)
    {
        $rendezVous->delete();

        return response()->json(null, 204);
    }

    public function upcoming()
    {
        $rdvs = RendezVous::with('client')
            ->where('date', '>=', Carbon::now())
            ->orderBy('date', 'asc')
            ->get();

        return response()->json($rdvs);
    }

    public function dashboard()
    {
        return response()->json([
            'total_clients' => Client::count(),
            'total_rdv' => RendezVous::count(),
            'rdv_a_venir' => RendezVous::where('date', '>=', Carbon::now())->count(),
            'prochains_rdv' => RendezVous::with('client')
                ->where('date', '>=', Carbon::now())
                ->orderBy('date', 'asc')
                ->take(5)
                ->get(),
        ]);
    }
}
