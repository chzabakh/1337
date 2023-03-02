/* ************************************************************************** */
/*                                                                            */
/*                                                        :::      ::::::::   */
/*   fractol.h                                          :+:      :+:    :+:   */
/*                                                    +:+ +:+         +:+     */
/*   By: chzabakh <marvin@42.fr>                    +#+  +:+       +#+        */
/*                                                +#+#+#+#+#+   +#+           */
/*   Created: 2019/11/24 14:43:13 by chzabakh          #+#    #+#             */
/*   Updated: 2020/02/14 14:28:22 by chzabakh         ###   ########.fr       */
/*                                                                            */
/* ************************************************************************** */

#ifndef FRACTOL_H
# define FRACTOL_H
# include "../libft/libft.h"
# include <math.h>
# include "mlx.h"

typedef	struct	s_mlx
{

	void	*mlx_ptr;
	void	*win_ptr;
	void	*img_ptr;
	double	r;
	double	i;
	double	remax;
	double	remin;
	double	immax;
	double	immin;
	double	mousex;
	double	mousey;
	double	zm;
	int		*i_s;
	int		bpp;
	int		l;
	int		ed;
	int		index;
	int		v;
	int		maxiter;
	int		arwj;
	int		arwi;
	int		clr;
	int		clr2;
	int		x;
	int		y;
	int		color;
	int		iter;
}				t_mlx;

void			ft_image(t_mlx *m);
void			ft_mandelbrot(t_mlx *m);
void			ft_julia(t_mlx *m);
void			ft_tricorn(t_mlx *m);
void			ft_multibrot(t_mlx *m);
void			ft_5brot(t_mlx *m);
void			ft_burningship(t_mlx *m);
void			ft_clear_image(t_mlx *move2);
int				close_window(void *m);
void			ft_draw(t_mlx *m);
int				keypress(int keycode, void *m);
int				mousepress(int button, int x, int y, t_mlx *m);
int				mousemove(int x, int y, t_mlx *m);
void			zoom(t_mlx *m, int button, int x, int y);
double			interpolate(double start, double end, double interpolation);
#endif
